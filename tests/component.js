/**
 * @license Copyright (c) 2003-2019, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md.
 */

import Vue from 'vue';
import { mount } from '@vue/test-utils';
import CKEditorComponent from '../src/ckeditor';
import sinon from 'sinon';
import { getEditorNamespace } from '../src/utils/geteditornamespace';

/* global window */
const CKEDITOR = window.CKEDITOR;

describe( 'CKEditor Component', () => {
	const spies = {};

	let skipReady = false;
	let sandbox, wrapper, component, props;

	beforeEach( done => {
		spies.replace = sinon.spy( CKEDITOR, 'replace' );
		spies.inline = sinon.spy( CKEDITOR, 'inline' );

		wrapper = createComponent( props );
		component = wrapper.vm;
		sandbox = sinon.createSandbox();

		if ( skipReady ) {
			done();
		} else {
			component.$once( 'ready', () => {
				done();
			} );
		}
	} );

	afterEach( () => {
		skipReady = false;

		for ( const key in spies ) {
			spies[ key ].restore();
		}

		wrapper.destroy();
		sandbox.restore();
	} );

	describe( 'initialization', () => {
		it( 'component should have a name', () => {
			expect( CKEditorComponent.name ).to.equal( 'ckeditor' );
		} );

		it( 'should render', () => {
			expect( wrapper.html() ).to.not.be.empty;
		} );

		describe( 'property', () => {
			[ {
				property: 'value',
				defaultValue: ''
			}, {
				property: 'type',
				defaultValue: 'classic',
			}, {
				property: 'editorUrl',
				defaultValueRegex: /https:\/\/cdn\.ckeditor\.com\/4\.\d{1,2}\.\d{1,2}\/(standard|basic|full)(-all)?\/ckeditor\.js/
			}, {
				property: 'config',
				defaultValue: undefined
			}, {
				property: 'tagName',
				defaultValue: 'textarea'
			}, {
				property: 'readOnly',
				defaultValue: null
			} ].forEach( ( { property, defaultValue, defaultValueRegex } ) => {
				it( `"${ property }" should have default value`, () => {
					if ( defaultValue ) {
						expect( component[ property ] ).to.equal( defaultValue );
					}

					if ( defaultValueRegex ) {
						expect( component[ property ] ).to.match( defaultValueRegex );
					}
				} );
			} );
		} );

		// Repeat description, so test are nicely grouped in the output,
		// but keep them separate in code, because they need different setup.
		describe( 'property', () => {
			[ {
				property: 'value',
				value: 'foo'
			}, {
				property: 'type',
				value: 'inline'
			}, {
				property: 'editorUrl',
				value: 'https://cdn.ckeditor.com/4.10.0/basic-all/ckeditor.js'
			}, {
				property: 'config',
				value: {}
			}, {
				property: 'tagName',
				value: 'div'
			}, {
				property: 'readOnly',
				value: true
			} ].forEach( ( { property, value } ) => {
				setPropsForTestGroup( { [ property ]: value } );

				it( `"${ property }" should be configurable`, () => {
					expect( component[ property ] ).to.equal( value );
				} );
			} );
		} );

		[ {
			readOnly: true,
			config: { readOnly: false }
		}, {
			readOnly: false,
			config: { readOnly: true }
		} ].forEach( ( { readOnly, config } ) => {
			describe( `when component.readOnly = ${ readOnly } and config.readOnly = ${ config.readOnly }`, () => {
				setPropsForTestGroup( { readOnly, config } );

				it( 'should use component.readOnly', () => {
					expect( spies.replace.lastCall.args[ 1 ] ).to.include( { readOnly } );
				} );
			} );
		} );

		describe( 'when editor type', () => {
			[ {
				type: 'unset',
				method: 'replace'
			}, {
				type: 'classic',
				method: 'replace'
			}, {
				type: 'inline',
				method: 'inline'
			} ].forEach( ( { type, method } ) => {
				describe( type === 'unset' ? 'unset' : `set to "${ type }"`, () => {
					const config = { foo: 'bar' };

					if ( type !== 'unset' ) {
						setPropsForTestGroup( { type } );
					} else {
						type = 'classic';
					}

					setPropsForTestGroup( { config } );

					it( `"component.type" should be "${ type }"`, () => {
						expect( component.type ).to.equal( type );
					} );

					it( `should call "CKEDITOR.${ method }" with given config`, () => {
						sinon.assert.calledOnce( spies[ method ] );

						expect( spies[ method ].lastCall.args[ 1 ] ).to.include( config );
					} );
				} );
			} );

			describe( 'set to invalid value', () => {
				it( 'should be disallowed by validator', () => {
					expect( component.$options.props.type.validator( 'foo' ) ).to.be.false;
				} );
			} );
		} );
	} );

	describe( 'events', () => {
		[
			'input',
			'focus',
			'blur'
		].forEach( evtName => {
			let getDataMock, spy, editorEvtName;

			beforeEach( () => {
				editorEvtName = evtName;
				spy = sinon.spy();

				if ( evtName === 'input' ) {
					editorEvtName = 'change';
					getDataMock = sinon.stub( component.instance, 'getData' ).returns( 'foo' );
				}

				component.$on( evtName, spy );
				component.instance.fire( editorEvtName );
			} );

			afterEach( () => {
				if ( getDataMock ) {
					getDataMock.restore();
					getDataMock = null;
				}
			} );

			it( `should emit "${ evtName }"`, () => {
				sinon.assert.calledOnce( spy );
			} );

			if ( evtName === 'input' ) {
				it( 'when data didn\'t change shouldn\'t emit input', () => {
					spy.resetHistory();

					getDataMock.returns( component.value );

					component.instance.fire( editorEvtName );

					sinon.assert.notCalled( spy );
				} );
			}
		} );
	} );

	describe( 'when component destroyed', () => {
		beforeEach( () => {
			spies.destroy = sinon.spy( component.instance, 'destroy' );
			wrapper.destroy();
		} );

		it( 'should call "instance.destroy"', () => {
			sinon.assert.calledOnce( spies.destroy );
		} );
	} );

	// This test might look a bit strange, but it's crucial to run things in proper order.
	describe( 'when component destroyed before getEditorNamespace resolves', () => {
		let resolveMockReturnedPromise,
			resolveMockCalled;

		const whenMockCalled = new Promise( res => {
			resolveMockCalled = res;
		} );

		const mockReturnedPromise = new Promise( res => {
			resolveMockReturnedPromise = res;
		} );

		const originalMethod = getEditorNamespace.scriptLoader;

		// Mock `getEditorNamespace` before component is created.
		before( () => {
			skipReady = true;

			delete window.CKEDITOR;

			getEditorNamespace.scriptLoader = () => {
				resolveMockCalled();
				return mockReturnedPromise;
			};
		} );

		// When component is created.
		beforeEach( done => {
			// Wait for the mock to be called so that we are sure that `component.mounted` is called and it awaits for the promise.
			whenMockCalled.then( () => {
				wrapper.destroy();

				// Wait for `component.beforeDestroy`.
				Vue.nextTick().then( () => {
					window.CKEDITOR = CKEDITOR;

					resolveMockReturnedPromise( CKEDITOR );

					// Wait for components callback to `getEditorNamespace`.
					Vue.nextTick().then( done );
				} );
			} );
		} );

		after( () => {
			getEditorNamespace.scriptLoader = originalMethod;
		} );

		it( 'editor shouldn\'t be initialized', () => {
			sinon.assert.notCalled( spies.replace );
		} );
	} );

	[ {
		property: 'value',
		value: 'foo',
		spyOn: [ 'setData', true ]
	}, {
		property: 'value',
		value: '',
		spyOn: [ 'setData', false ]
	}, {
		property: 'readOnly',
		value: true,
		spyOn: [ 'setReadOnly', true ]
	}, {
		property: 'readOnly',
		value: false,
		spyOn: [ 'setReadOnly', true ]
	}, {
		property: 'readOnly',
		value: null,
		spyOn: [ 'setReadOnly', false ]
	} ].forEach( ( { property, value, spyOn: [ method, spyCalled ] } ) => {
		describe( `when "component.${ property }" changes to "${ value }"`, () => {
			let spy;

			beforeEach( () => {
				spy = spies[ method ] = sinon.spy( component.instance, method );
				wrapper.setProps( { [ property ]: value } );
			} );

			it( `${ spyCalled ? 'should' : 'shouldn\'t' } call "instance.${ method }"`, () => {
				if ( spyCalled ) {
					sinon.assert.calledWith( spy, value );
				} else {
					sinon.assert.notCalled( spy );
				}
			} );
		} );
	} );

	function createComponent( props ) {
		return mount( CKEditorComponent, {
			propsData: { ...props },
			attachToDocument: true
		} );
	}

	function setPropsForTestGroup( newProps ) {
		// "before" is executed before "beforeEach", so we can setup props now.
		before( () => {
			props = { ...props, ...newProps };
		} );

		after( () => {
			props = null;
		} );
	}
} );

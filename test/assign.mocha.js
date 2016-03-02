'use strict'

let chai = require('chai')
let expect = chai.expect

let Assigner = require('../lib/assign')

describe('Assign.js', function () {
	let assigner = new Assigner()
	let person = {
		name: 'Phil',
		address: 'Fine square 2',
		age: 20,
		relatives: {
			philip: true,
			karl: false
		}
	}
	before(function (done) {
		done()
	})

	describe('Test Assign services', function () {
		it('Non recursive assign', function (done) {
			assigner.respect( true ).recursive(false)
			let res = assigner.assign( { relatives: {} }, person )
			expect( res ).to.have.property('relatives')
			expect( res.relatives ).to.not.have.property('philip')
			done()
		})
		it('Recursive assign', function (done) {
			assigner.respect( false ).recursive(true)
			let res = assigner.assign( {}, person )
			expect( res ).to.have.property('relatives')
			expect( res.relatives ).to.have.property('philip')
			done()
		})
		it('Assign by attributes', function (done) {
			assigner.recursive(false).attributes( [ 'name', 'address' ] )
			let res = assigner.assign( {}, person )
			expect( res ).to.not.have.property('relatives')
			done()
		})
		it('Respected assign', function (done) {
			assigner.recursive(true).attributes( ).respect( true )
			let res = assigner.assign( { relatives: { philip: false } }, person )
			expect( res.relatives.philip ).to.be.false
			done()
		})
	})

	after(function (done) {
		done()
	})
})
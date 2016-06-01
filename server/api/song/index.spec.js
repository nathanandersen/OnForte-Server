'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var songCtrlStub = {
  index: 'songCtrl.index',
  show: 'songCtrl.show',
  create: 'songCtrl.create',
  update: 'songCtrl.update',
  destroy: 'songCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var songIndex = proxyquire('./index.js', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './song.controller': songCtrlStub
});

describe('Song API Router:', function() {

  it('should return an express router instance', function() {
    expect(songIndex).to.equal(routerStub);
  });

  describe('GET /api/songs', function() {

    it('should route to song.controller.index', function() {
      expect(routerStub.get
        .withArgs('/', 'songCtrl.index')
        ).to.have.been.calledOnce;
    });

  });

  describe('GET /api/songs/:id', function() {

    it('should route to song.controller.show', function() {
      expect(routerStub.get
        .withArgs('/:id', 'songCtrl.show')
        ).to.have.been.calledOnce;
    });

  });

  describe('POST /api/songs', function() {

    it('should route to song.controller.create', function() {
      expect(routerStub.post
        .withArgs('/', 'songCtrl.create')
        ).to.have.been.calledOnce;
    });

  });

  describe('PUT /api/songs/:id', function() {

    it('should route to song.controller.update', function() {
      expect(routerStub.put
        .withArgs('/:id', 'songCtrl.update')
        ).to.have.been.calledOnce;
    });

  });

  describe('PATCH /api/songs/:id', function() {

    it('should route to song.controller.update', function() {
      expect(routerStub.patch
        .withArgs('/:id', 'songCtrl.update')
        ).to.have.been.calledOnce;
    });

  });

  describe('DELETE /api/songs/:id', function() {

    it('should route to song.controller.destroy', function() {
      expect(routerStub.delete
        .withArgs('/:id', 'songCtrl.destroy')
        ).to.have.been.calledOnce;
    });

  });

});

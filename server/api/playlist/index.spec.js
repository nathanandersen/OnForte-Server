'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var playlistCtrlStub = {
  index: 'playlistCtrl.index',
  show: 'playlistCtrl.show',
  create: 'playlistCtrl.create',
  update: 'playlistCtrl.update',
  destroy: 'playlistCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var playlistIndex = proxyquire('./index.js', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './playlist.controller': playlistCtrlStub
});

describe('Playlist API Router:', function() {

  it('should return an express router instance', function() {
    expect(playlistIndex).to.equal(routerStub);
  });

  describe('GET /api/playlists', function() {

    it('should route to playlist.controller.index', function() {
      expect(routerStub.get
        .withArgs('/', 'playlistCtrl.index')
        ).to.have.been.calledOnce;
    });

  });

  describe('GET /api/playlists/:id', function() {

    it('should route to playlist.controller.show', function() {
      expect(routerStub.get
        .withArgs('/:id', 'playlistCtrl.show')
        ).to.have.been.calledOnce;
    });

  });

  describe('POST /api/playlists', function() {

    it('should route to playlist.controller.create', function() {
      expect(routerStub.post
        .withArgs('/', 'playlistCtrl.create')
        ).to.have.been.calledOnce;
    });

  });

  describe('PUT /api/playlists/:id', function() {

    it('should route to playlist.controller.update', function() {
      expect(routerStub.put
        .withArgs('/:id', 'playlistCtrl.update')
        ).to.have.been.calledOnce;
    });

  });

  describe('PATCH /api/playlists/:id', function() {

    it('should route to playlist.controller.update', function() {
      expect(routerStub.patch
        .withArgs('/:id', 'playlistCtrl.update')
        ).to.have.been.calledOnce;
    });

  });

  describe('DELETE /api/playlists/:id', function() {

    it('should route to playlist.controller.destroy', function() {
      expect(routerStub.delete
        .withArgs('/:id', 'playlistCtrl.destroy')
        ).to.have.been.calledOnce;
    });

  });

});

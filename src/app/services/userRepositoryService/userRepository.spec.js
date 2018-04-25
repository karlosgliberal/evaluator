import userRepositoryServices from './userRepository.services';
import networkManagerServices from './../networkManagerService/networkManager.services';

describe('User repository', () => {
  let $http, networkManagerService, userRepository;

  beforeEach(angular.mock.module(networkManagerServices.name, $provide => {
    networkManagerService = {isOffline: sinon.stub(), startWatching: sinon.stub()};
    $provide.value('networkManagerService', networkManagerService);
  }));

  beforeEach(angular.mock.module(userRepositoryServices.name, $provide => {
    $http = {post: sinon.stub()};
    $provide.value('$http', $http);
  }));

  beforeEach(inject((_userRepository_) => {
    userRepository = _userRepository_;
  }));

  describe('login', () => {
    it('should login for email and password when online', done => {
      networkManagerService.isOffline.returns(false);
      $http.post.returns(Promise.resolve({data: {email: '::email::'}}));

      const loginPromise = userRepository.login('::email::', '::password::');

      loginPromise.then(user => {
        expect(user).to.eql({email: '::email::'});
        done();
      });
    });

    it('should throw error on invalid login when online', done => {
      networkManagerService.isOffline.returns(false);
      $http.post.returns(Promise.reject(new Error('invalid')));

      const loginPromise = userRepository.login('::email::', '::password::');

      loginPromise.catch(error => {
        expect(error.message).to.equal('invalid');
        done();
      });
    });

    it('should throw error on offline login', done => {
      networkManagerService.isOffline.returns(true);

      const loginPromise = userRepository.login('::email::', '::password::');

      loginPromise.catch(error => {
        expect(error.message).to.equal('internet');
        done();
      });
    });
  });

  describe('register', () => {
    it('should register when online', done => {
      networkManagerService.isOffline.returns(false);
      $http.post.returns(Promise.resolve({data: {email: '::email::', isOlmixUser: true}}));

      const registerPromise = userRepository.register({
        name: '::name::',
        surname: '::surname::',
        company: '::company::',
        email: '::email::',
        password: '::password::'
      });

      registerPromise.then(user => {
        expect(user).to.eql({email: '::email::', isOlmixUser: true});
        done();
      });
    });

    it('should throw error on invalid register', done => {
      networkManagerService.isOffline.returns(false);
      $http.post.returns(Promise.reject(new Error('invalid')));

      const registerPromise = userRepository.register({});

      registerPromise.catch(error => {
        expect(error.message).to.equal('invalid');
        done();
      });
    });

    it('should throw error on offline register', done => {
      networkManagerService.isOffline.returns(true);

      const registerPromise = userRepository.register({
        name: '::name::',
        surname: '::surname::',
        company: '::company::',
        email: '::email::',
        password: '::password::'
      });

      registerPromise.catch(error => {
        expect(error.message).to.equal('internet');
        done();
      });
    });
  });
});

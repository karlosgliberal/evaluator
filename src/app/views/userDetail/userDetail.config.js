import userDetail from './userDetail.html';

/*@ngInject*/
const UserDetailConfig = ($stateProvider) => {
    $stateProvider.state('userDetail', {
        url: '/userDetail',
        template: userDetail,
        controller: 'UserDetailController',
        controllerAs: 'movida',
        params: {
            'user': ''
        }
    })
};

export default UserDetailConfig;

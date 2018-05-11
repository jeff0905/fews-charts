/**
 *
 */
import $http from './../$base/http'
const AccountService = {}

// for test...for test...for test...for test...for test...for test...
/**
 *
 * @param {*} username
 * @param {*} password
 */
AccountService.login = (username, password) => {
  return $http.post('/login', {username: 'admin', password: 'admin'})
    .then(res => {
      return Promise.resolve(res)
    })
}

AccountService.getList = () => {
  return $http.get('/getUsers', {})
    .then(res => {
      console.log('" store AccountService.getList()"', res)
      const result = { data: { result: [{ name: 'jeff' }, { name: 'allen' }] } }
      return Promise.resolve(result)
    })
}
export default AccountService

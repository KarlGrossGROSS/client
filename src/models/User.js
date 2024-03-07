/**
 * User model
 */
class User {
  constructor(data = {}) {
    this.id = null;
    this.name = null;
    this.username = null;
    this.token = null;
    this.status = null;
    this.birthdate=null;
    this.creation_date=null;
    Object.assign(this, data);
  }
}

export default User;

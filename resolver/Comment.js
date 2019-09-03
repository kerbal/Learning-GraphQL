import { users } from "../sample resources/users";

const Comment = {
  Username: (parent) => {
    return users.find(user => user.Id == parent.UserId).Name;
  }
};

export default Comment;
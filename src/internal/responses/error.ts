export const ERROR_RESPONSES = {
  USER_NOT_FOUND: {
    status: "EU001",
    message: "User not found.",
  },
  USER_ALREADY_EXISTS: {
    status: "EU002",
    message: "Username is already taken.",
  },
  ERROR_CREATE_USER: {
    status: "EU003",
    message: "Failed to create user.",
  },
  ERROR_LOGIN: {
    status: "EA001",
    message: "Unauthorized.",
  },
  ERROR_REGISTER: {
    status: "EA002",
    message: "Registration failed.",
  },
  POST_NOT_FOUND: {
    status: "EU001",
    message: "Post not found.",
  },
  ERROR_CREATE_POST: {
    status: "EP002",
    message: "Failed to create post.",
  },
  ERROR_UPDATE_POST: {
    status: "EP003",
    message: "Failed to update post.",
  },
  ERROR_GET_POSTS: {
    status: "EP004",
    message: "Failed to fetch posts.",
  },
  ERROR_GET_POST: {
    status: "EP005",
    message: "Failed to fetch post.",
  },
  ERROR_DELETE_POST: {
    status: "EP006",
    message: "Failed to delete post.",
  },
};

export class UserNotFoundException extends Error {
  constructor() {
    super(ERROR_RESPONSES.USER_NOT_FOUND.message);
  }
}

export class UserAlreadyExistsException extends Error {
  constructor() {
    super(ERROR_RESPONSES.USER_ALREADY_EXISTS.message);
  }
}

export class UserCreateErrorException extends Error {
  constructor() {
    super(ERROR_RESPONSES.ERROR_CREATE_USER.message);
  }
}

export class PostCreateErrorException extends Error {
  constructor() {
    super(ERROR_RESPONSES.ERROR_CREATE_POST.message);
  }
}

export class PostNotFoundException extends Error {
  constructor() {
    super(ERROR_RESPONSES.POST_NOT_FOUND.message);
  }
}

export class PostUpdateErrorException extends Error {
  constructor() {
    super(ERROR_RESPONSES.ERROR_UPDATE_POST.message);
  }
}

export class PostDeleteErrorException extends Error {
  constructor() {
    super(ERROR_RESPONSES.ERROR_DELETE_POST.message);
  }
}

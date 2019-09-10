class ObjectService {
  static deleteProp(obj, props) {
    for(const prop of props) {
      delete obj[prop];
    }
  }
}

export default ObjectService;
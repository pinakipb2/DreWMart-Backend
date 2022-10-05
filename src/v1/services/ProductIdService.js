import { v4 as uuidv4 } from 'uuid';
import cuid from 'cuid';

class ProductIdService {
  // Generate a Product ID
  static generateProductID() {
    const UUIDArray = uuidv4().split('-');
    return UUIDArray[0] + '-' + UUIDArray[UUIDArray.length - 1] + '-' + cuid();
  }
}

export default ProductIdService;

import * as userService from '../../users/library/service.users';
import * as serService from '../../services/library/service.service';
import * as catService from '../../services/library/service.categories';

export async function getNextDbId() {
  const nextUserId = await userService.nextUserId();
  const nextServiceId = await serService.nextServiceId();
  const nextCatId = await catService.nextCategoryId();

  const result = Math.max(nextUserId, nextServiceId, nextCatId);
  return result;
}

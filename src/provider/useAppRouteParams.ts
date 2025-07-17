import { useRoute, RouteProp } from '@react-navigation/native';
import { NavigationParamsList } from './NavigationParamsList';
import { navigationEnums } from './navigationEnums';

/**
 * Usage:
 *   const { id } = useAppRouteParams('STABLE_SERVICES_DETAILS');
 *   // 'id' is auto-hinted based on NavigationParamsList['STABLE_SERVICES_DETAILS']
 */
function useAppRouteParams<K extends keyof typeof navigationEnums>(
  key: K
) {
  // Get the actual route name string from the enum
  type RouteName = (typeof navigationEnums)[K];
  // @ts-ignore
  const route = useRoute<RouteProp<NavigationParamsList, RouteName>>();
    // @ts-ignore

  return route.params as NavigationParamsList[RouteName];
}

export default useAppRouteParams;
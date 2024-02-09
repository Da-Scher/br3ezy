/* code modified from https://angular.io/tutorial/first-app/first-app-lesson-04 */

export interface StreamListing {
  id: number;
  user_id: number;
  title: string;
  description: string;
  start_time: number;
  is_active: boolean;
  photo: string;
  }
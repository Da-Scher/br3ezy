/* code modified from https://angular.io/tutorial/first-app/first-app-lesson-04 */

export interface StreamListing {
    id: number;
    name: string;
    city: string;
    state: string;
    photo: string;
    availableUnits: number;
    wifi: boolean;
    laundry: boolean;
  }
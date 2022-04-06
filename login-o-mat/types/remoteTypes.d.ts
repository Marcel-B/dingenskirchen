declare module "bookomat/store" {
   interface Store {
      userStore;
      commonStore;
      modalStore;
    }
	export const store : Store;
   export const StoreContext : React.Context<Store>;
   export const useStore: () => Store;
}

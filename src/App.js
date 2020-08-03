import React from "react";
import { preloadFirestore } from "reactfire";
import {
  preloadFirestoreDoc,
  useFirebaseApp,
  preloadUser,
  preloadAuth,
  SuspenseWithPerf,
  preloadDatabase,
  preloadStorage,
  preloadRemoteConfig
} from "reactfire";
import { Dashboard } from "./Dashboard";

// Our components will lazy load the
// SDKs to decrease their bundle size.
// Since we know that, we can start
// fetching them now
const preloadSDKs = firebaseApp => {
  return Promise.all([
    preloadFirestore({
      firebaseApp,
      setup(firestore) {
        return firestore().enablePersistence();
      }
    }),
    preloadStorage({
      firebaseApp,
      setup(storage) {
        return storage().setMaxUploadRetryTime(10000);
      }
    }),
    preloadAuth({ firebaseApp }),
    preloadRemoteConfig({
      firebaseApp,
      setup(remoteConfig) {
        remoteConfig().settings = {
          minimumFetchIntervalMillis: 10000,
          fetchTimeoutMillis: 10000
        };
        return remoteConfig().fetchAndActivate();
      }
    })
  ]);
};

const preloadData = async firebaseApp => {
  const user = await preloadUser(firebaseApp);

  if (user) {
    preloadFirestoreDoc(
      firestore => firestore.doc("styles/dashboard"),
      firebaseApp
    );
  }
};

export default () => {
  const firebaseApp = useFirebaseApp();

  // Kick off fetches for SDKs and data that
  // we know our components will eventually need.
  //
  // This is OPTIONAL but encouraged as part of the render-as-you-fetch pattern
  // https://reactjs.org/docs/concurrent-mode-suspense.html#approach-3-render-as-you-fetch-using-suspense
  preloadSDKs(firebaseApp).then(preloadData(firebaseApp));

  return (
    <SuspenseWithPerf fallback={"loading"} traceId={"main-app"}>
      <Dashboard />
    </SuspenseWithPerf>
  );
};

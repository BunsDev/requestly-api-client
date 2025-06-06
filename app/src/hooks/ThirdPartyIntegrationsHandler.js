import { useCallback, useEffect } from "react";
import firebaseApp from "firebase.js";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { initIntegrations } from "modules/analytics";
import { useDispatch } from "react-redux";
import { getEmailType } from "utils/mailCheckerUtils";

const ThirdPartyIntegrationsHandler = () => {
  const dispatch = useDispatch();
  const stableDispatch = useCallback(dispatch, [dispatch]);

  useEffect(() => {
    const auth = getAuth(firebaseApp);
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        const emailType = await getEmailType(user.email);
        initIntegrations({ ...user, emailType }, stableDispatch);
      } else {
        initIntegrations(user, stableDispatch);
      }
    });
  }, [stableDispatch]);
};

export default ThirdPartyIntegrationsHandler;

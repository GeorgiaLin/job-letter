import mixpanel from "mixpanel-browser";

mixpanel.init("e3a72f0575c4e8e8ae9dcc07484330c0", {
  debug: process.env.NODE_ENV !== "production",
});

export default mixpanel;

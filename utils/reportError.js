import * as Sentry from "@sentry/node";

export const reportError = (error, feature) => {
  Sentry.setTag("feature", feature);
  Sentry.captureException(error);
};

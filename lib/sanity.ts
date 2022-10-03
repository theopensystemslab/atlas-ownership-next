// lib/sanity.js
import {
  createPreviewSubscriptionHook,
  createCurrentUserHook,
} from "next-sanity"
import createImageUrlBuilder from "@sanity/image-url"
import sanityConfig from "./config"

/**
 * Set up a helper function for generating Image URLs with only the asset reference data in your documents.
 * Read more: https://www.sanity.io/docs/image-url
 **/
export const urlFor = (source: string) =>
  createImageUrlBuilder(sanityConfig).image(source)

// Set up the live preview subscription hook
export const usePreviewSubscription =
  createPreviewSubscriptionHook(sanityConfig)

// Helper function for using the current logged in user account
export const useCurrentUser = createCurrentUserHook(sanityConfig)

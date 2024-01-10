import { trpc } from "@/lib/trpc";
import NoopLayout from "../components/layout/NoopLayout";
import { ContentPage } from "@/components/ContentPage";

const AccessibilityPage = () => {
  const { data: accessibilityPage } = trpc.page.useQuery({
    pageSlug: "accessibility",
  });

  return <ContentPage page={accessibilityPage} />;
};

AccessibilityPage.getLayout = NoopLayout;

export default AccessibilityPage;

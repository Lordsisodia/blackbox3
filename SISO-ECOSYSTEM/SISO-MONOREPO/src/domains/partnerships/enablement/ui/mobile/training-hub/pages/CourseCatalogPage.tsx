import { CourseCatalogSection } from "../sections";
import { courseCatalog } from "../data";

export function CourseCatalogPage() {
  return (
    <div className="space-y-6 p-4">
      <CourseCatalogSection courses={courseCatalog} />
    </div>
  );
}

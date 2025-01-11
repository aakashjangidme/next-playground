export function SiteFooter() {
  return (
    <footer className="border-grid border-t py-6 md:px-8 md:py-0">
      <div className="container-wrapper">
        <div className="container py-4">
          <div className="text-balance text-center text-sm  leading-loose text-muted-foreground md:text-left">
            &copy; {new Date().getFullYear()} PlaygroundX - Made by Aakash w/ ❤️
            .
          </div>
        </div>
      </div>
    </footer>
  );
}

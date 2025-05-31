import 'bootstrap/dist/css/bootstrap.min.css';


export const metadata = {
  title: "Meeting Minutes Extractor",
  description: "Extract meeting summaries, decisions, and action items",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

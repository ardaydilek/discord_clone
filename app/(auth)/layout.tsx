export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <main className="h-full grid place-items-center">{children}</main>;
}

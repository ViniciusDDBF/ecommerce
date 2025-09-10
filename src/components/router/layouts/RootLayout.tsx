import { Outlet, useNavigation } from 'react-router';
import Header from '../../Header';
import LoadingOverlay from '../../LoadingOverlay';
import DialogExampleUsage from '../../DialogExampleUsage';
import Button from '../../Button';

export default function RootLayout() {
  const navigation = useNavigation();
  const isLoading =
    navigation.state === 'loading' || navigation.state === 'submitting';

  return (
    <div>
      {isLoading && <LoadingOverlay />}
      <Header />

      <main>
        <Outlet />
        <DialogExampleUsage />
        <Button variant="primary" text="MRRRNGAU" />
      </main>

      <footer>
        <h1 className="fixed bottom-0 w-full text-center">mrrrngau</h1>
      </footer>
    </div>
  );
}

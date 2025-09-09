import { Outlet, useNavigation } from 'react-router';
import Header from '../components/Header';
import LoadingOverlay from '../components/LoadingOverlay';
import DialogExampleUsage from '../components/DialogExampleUsage';
import Button from '../components/Button';

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

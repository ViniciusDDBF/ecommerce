import { Outlet, useNavigation } from 'react-router';
import Header from '../components/Header';
import LoadingOverlay from '../components/LoadingOverlay';
import DialogExampleUsage from '../components/DialogExampleUsage';
import Button from '../components/Button';

export default function RootLayout() {
  const navigation = useNavigation();

  return (
    <div>
      {navigation.state === 'loading' && <LoadingOverlay />}
      <Header />

      <main>
        <Outlet />
        <DialogExampleUsage />
        <Button variant="primary" text="MRRRNGAU" />
      </main>

      <footer>
        <h1 className="w-full text-center fixed bottom-0">mrrrngau</h1>
      </footer>
    </div>
  );
}

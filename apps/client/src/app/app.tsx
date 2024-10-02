import NxWelcome from './nx-welcome';
import {UnboardingPage} from "@react-monorepo/shared"


export function App() {
  return (
    <div>
      <NxWelcome title="client" />
      <UnboardingPage></UnboardingPage>
    </div>
  );
}

export default App;

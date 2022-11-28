import { RotatingLines } from 'react-loader-spinner';
import AuthLayout from '../../components/layout/AuthLayout';

const Verify = () => {
  return (
    <AuthLayout
      changeDesign="true"
      page="verify password"
      pageTitle="Verify your password"
    >
      <div className="flex gap-30 h-250">
        <RotatingLines
          strokeColor="#0090E1"
          strokeWidth="5"
          animationDuration="0.75"
          width="96"
          visible={true}
        />
      </div>
    </AuthLayout>
  );
};

export default Verify;

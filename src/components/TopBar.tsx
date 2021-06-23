import { Layout, AvatarInline } from 'ebs-design';

const TopBar = () => {
  const userName = `${localStorage.getItem('firstName')} ${localStorage.getItem('lastName')}`;
  const email = localStorage.getItem('email');

  return (
    <Layout.Topbar>
      <Layout.Topbar.Toggler />

      <Layout.Topbar.Title>Logo</Layout.Topbar.Title>

      <Layout.Topbar.RightSide>
        <AvatarInline alt={userName} status="active" description={email!} />
      </Layout.Topbar.RightSide>
    </Layout.Topbar>
  );
};

export default TopBar;

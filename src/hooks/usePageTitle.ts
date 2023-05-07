export const usePageTitle = (path: string) => {
  let title: string;
  switch (path) {
    case '/group':
      title = 'Group';
      break;
    case '/portal':
      title = 'ポータル';
      break;
    case '/apps':
      title = 'アプリ';
      break;
    case '/wallet':
      title = 'wallet';
      break;
    case '/':
      title = 'Reunion';
      break;
    case '/transferManagement':
      title = '送信管理';
      break;
    case '/transferManagement2':
      title = '送信管理';
      break;
    case '/conditionalTransfer':
      title = '条件を指定して送信';
      break;
    case '/profile':
      title = 'My Profile';
      break;
    case '/profile/register':
      title = '新規プロフィール登録';
      break;
    case '/profile/confirm':
      title = '登録情報の確認';
      break;
    case '/profile/edit':
      title = '登録情報の編集';
      break;
    case '/profile/editConfirm':
      title = '変更内容の確認';
      break;
    default:
      title = path;
      break;
  }

  return title;
};
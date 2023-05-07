#!/bin/bash
echo "Choose your deployment environment:"
select ENV in local ic_demo ic_staging
#doからdoneまでループ処理
do
	break
done
echo "Execute deploy process in ${ENV} environment!"

# settings >>>
backup_flg=false
canister_ids_dir="canister_ids"
backup_ids_json_path="./${canister_ids_dir}/backup_canister_ids.json"
env_ids_json_path="./${canister_ids_dir}/${ENV}_canister_ids.json"
# <<< settings

function main () {
  if [ "$ENV" != "local" ];then
    cp ./envs/.env.$ENV .env.production
    # rootディレクトリにcanister_ids.jsonが存在する場合 >>>
    if [ -e "./canister_ids.json" ]; then
      # canister_ids_dir内にdeploy環境に応じた >>>
      # canister_ids.jsonが格納されていない場合
      # エラーを知らせてexitする
      if [ ! -e $env_ids_json_path ]; then
        echo -e "Not found file < ${env_ids_json_path} >"
      fi
      # <<< canister_ids_dir内にdeploy環境に応じたcanister_ids.jsonが格納されていない場合

      # deploy環境に応じたcanister_ids.jsonとrootに存在しているcanister_ids.jsonの内容が同一かチェック
      diff -s ./canister_ids.json $env_ids_json_path > /dev/null 2>&1
      # 異なるファイルの場合（diffの実行結果が 1 になる） >>>
      if [ $? -eq 1 ]; then
        # rootディレクトリのcanister_ids.jsonを退避
        mv ./canister_ids.json $backup_ids_json_path
        # backup_flgをtrueに変更（後でファイルを元に戻すため）
        backup_flg=true
        # canister_idsディレクトリから環境に応じたcanister_ids。jsonファイルをrootディレクトリにコピー >>>
        cp $env_ids_json_path ./canister_ids.json
      fi
      # <<< 異なるファイルの場合
    fi
    # <<< rootディレクトリにcanister_ids.jsonが存在する場合は退避
  fi

  bash ./backend/nn_backend/create_cindidfile.sh
  bash cargo install ic-cdk-optimizer --version=0.3.4
  npm run build

  if [ "$ENV" = "local" ];then
    dfx identity use default
    dfx deploy
    npm run dev
  else
    dfx identity use reunion
    dfx deploy --network ic
    dfx identity use default
    # backupしていたcanister_ids.jsonをrootディレクトリに戻す >>>
    if [ $backup_flg = true ]; then
      mv $backup_ids_json_path ./canister_ids.json
    fi
    # <<< backupしていたcanister_ids.jsonをrootディレクトリに戻す
  fi
}

main
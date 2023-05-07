const canisterId_nn = process.env.NEXT_PUBLIC_NN_BACKEND_CANISTER_ID as String;
const host = process.env.NEXT_PUBLIC_IC_HOST as String;

// importしたいbackendキャニスターがある場合は
// 以下のimportとexportのセットを記述して、componetやpage側でimportすれば利用可能になる
// 参考：src/ui/components/greetButton.tsx

// nn_backend actor 
import {
  createActor as createNnActor
} from "../../declarations/nn_backend"

export function makeNnActor(canisterId: String = canisterId_nn) {
  return makeActor(canisterId, createNnActor)
}

export const makeActor = (canisterId: String, createActor: any) => {
  console.log('call makeActor. canisterId: ', canisterId);
  return createActor(canisterId, {
    agentOptions: {
      host: host
    }
  })
}

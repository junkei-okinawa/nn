use ic_exports::ic_cdk::export::candid::{CandidType, Deserialize};
use ic_storage::{stable::Versioned, IcStorage};
use std::cell::RefCell;
use std::rc::Rc;
mod matrix;
mod network;
use network::Network;

#[derive(Default, CandidType, Deserialize, IcStorage)]
pub struct MyCanisterState {
    network: Network,
}

impl Versioned for MyCanisterState {
    type Previous = ();

    fn upgrade((): ()) -> Self {
        Self::default()
    }
}

thread_local! {
    static STATE: Rc<RefCell<MyCanisterState>> = Rc::new(RefCell::new(MyCanisterState::default()));
}

pub fn network_init(layers_settings: Option<Vec<usize>>, learning_rate: Option<f64>) {
    let layers = layers_settings.unwrap_or(vec![784, 512, 128, 10]);
    let rate = learning_rate.unwrap_or(0.005);
    STATE.with(|state| state.borrow_mut().network = Network::new(layers, rate));
}

#[ic_cdk_macros::update]
#[candid::candid_method(update)]
fn single_train(input: Vec<f64>, labels: Vec<f64>) -> Result<(), String> {
    STATE.with(|state| state.borrow_mut().network.single_train(input, labels))
}

#[ic_cdk_macros::update]
#[candid::candid_method(update)]
fn train(input: Vec<Vec<f64>>, labels: Vec<Vec<f64>>, epochs: u16) -> Result<(), String> {
    STATE.with(|state| {
        if state.borrow().network.layers.len() == 0 {
            let layers = vec![input[0].len(), 512, 128, labels[0].len()];
            network_init(Some(layers), None);
        }
        state.borrow_mut().network.train(input, labels, epochs)
    })
}

#[ic_cdk_macros::query]
#[candid::candid_method(query)]
fn predict(input: Vec<f64>) -> Result<Vec<f64>, String> {
    STATE.with(|state| state.borrow().network.predict(input))
}

candid::export_service!();
#[ic_cdk_macros::query(name = "__get_candid_interface_tmp_hack")]
fn export_candid() -> String {
    __export_service()
}

#[cfg(test)]
mod tests {
    use super::*;
    #[test]
    #[ignore]
    fn _write_candid_to_disk() {
        std::fs::write("nn_backend.did", export_candid()).unwrap();
    }
}

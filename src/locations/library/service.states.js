import State from '../models/model.state';

export function getStates() {
    return State.find({});
}

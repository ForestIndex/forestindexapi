import State from '../../../locations/models/model.state';
import states from '../data/states';

export default {
    name: '001.addStates',
    up: addStates,
    down: () => Promise.resolve()
}

async function addStates() {
    const existingStates = await State.find({});
    if (!existingStates || existingStates.length < 50) {
        for (let i = 0; i < states.length; i++) {
            const state = states[i];
            const existingState = await State.findOne({ name: state.name });
            if (!existingState || !existingState._id) {
                const stateToSave = new State(state);
                stateToSave._id = i + 1;
                await stateToSave.save();
            }
        }
    }
}

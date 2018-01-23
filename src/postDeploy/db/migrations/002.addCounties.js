import locationData from '../data/counties';
import County from '../../../locations/models/model.county';
import State from '../../../locations/models/model.state';

export default {
  name: '002.addCounties',
  up: addCounties,
  down: () => Promise.resolve(),
}

async function addCounties() {
  const existingCounties = await County.find({});
  if (!existingCounties || existingCounties.length === 0) {
    let currentId = 1;
    for (const stateName in locationData) {
      if (locationData.hasOwnProperty(stateName)) {
        const counties = locationData[stateName];
        const existingState = await State.findOne({ name: stateName });
        for (let i = 0; i < counties.length; i++) {
          const countyName = counties[i];
          const c = new County({
            _id: currentId,
            name: counties[i],
            _state: existingState._id
          });
          await c.save();
          currentId += 1;
        }
      }
    }
  }
  return Promise.resolve();
}

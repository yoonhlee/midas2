export function getMissionsByJobCode(allMissions, jobCode) {
  return allMissions.filter((mission) => mission.job_code === jobCode);
}

export function getCurrentMission({ allMissions, state }) {
  if (state.selectedMissionKey) {
    return allMissions.find((mission) => mission.key === state.selectedMissionKey) || null;
  }
  const jobCode = state.selectedJobs[state.missionJobIndex];
  return getMissionsByJobCode(allMissions, jobCode)[state.missionStepIndex] || null;
}

export function getTotalMissionCount({ allMissions, selectedJobs, selectedMissionKey }) {
  if (selectedMissionKey) return 1;
  return selectedJobs.reduce((sum, jobCode) => sum + getMissionsByJobCode(allMissions, jobCode).length, 0);
}

export function getDoneMissionCount({ allMissions, state }) {
  if (state.selectedMissionKey) return 0;
  let done = 0;
  for (let idx = 0; idx < state.missionJobIndex; idx += 1) {
    done += getMissionsByJobCode(allMissions, state.selectedJobs[idx]).length;
  }
  return done + state.missionStepIndex;
}

export function isLastMission({ allMissions, state }) {
  if (state.selectedMissionKey) return true;
  const jobCode = state.selectedJobs[state.missionJobIndex];
  const missions = getMissionsByJobCode(allMissions, jobCode);
  return state.missionJobIndex === state.selectedJobs.length - 1
    && state.missionStepIndex === missions.length - 1;
}

function createMaze(factory ) {
  // Create rooms.
  var aMaze = factory.makeMaze();
  var r1 = factory.makeRoom();
  var r2 = factory.makeRoom();
  var theDoor = factory.makeDoor(r1, r2);
}
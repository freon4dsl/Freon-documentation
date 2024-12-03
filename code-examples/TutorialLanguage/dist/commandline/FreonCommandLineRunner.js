import { EntityModelEnvironment } from '../config/gen/EntityModelEnvironment';
import { FreonCommandLine } from './FreonCommandLine';
import { DummyAction } from './DummyAction';
const tmp = EntityModelEnvironment.getInstance();
const cli = new FreonCommandLine();
cli.addAction(new DummyAction());
cli.execute();
//# sourceMappingURL=FreonCommandLineRunner.js.map

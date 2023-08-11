import { classes } from '@automapper/classes';
import { AutomapperModule as _AutomapperModule } from '@automapper/nestjs';
import { Global, Module } from '@nestjs/common';

import { Automapper, IAutomapper } from './automapper';

@Global()
@Module({
  imports: [_AutomapperModule.forRoot({ strategyInitializer: classes() })],
  providers: [
    {
      provide: IAutomapper,
      useClass: Automapper,
    },
  ],
  exports: [IAutomapper],
})
export class AutomapperModule {}

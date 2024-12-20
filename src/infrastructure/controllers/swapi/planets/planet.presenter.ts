import { ApiProperty } from '@nestjs/swagger';

export class PlanetPresenter {
  @ApiProperty()
  name: string;
  @ApiProperty()
  climate: string;
  @ApiProperty()
  rotation_period: number;
  @ApiProperty()
  orbital_period: number;
}

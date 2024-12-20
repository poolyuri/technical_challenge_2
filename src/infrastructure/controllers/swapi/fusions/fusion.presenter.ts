import { ApiProperty } from '@nestjs/swagger';

export class FusionPresenter {
  @ApiProperty()
  name: string;
  @ApiProperty()
  gender: string;
  @ApiProperty()
  homeworld: string;
  @ApiProperty()
  birth_year: string;
  @ApiProperty()
  climate: string;
  @ApiProperty()
  rotation_period: number;
  @ApiProperty()
  orbital_period: number;
  @ApiProperty()
  gravity: string;
  @ApiProperty()
  terrain: string;
}

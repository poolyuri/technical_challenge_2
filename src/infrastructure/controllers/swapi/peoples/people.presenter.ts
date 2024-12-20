import { ApiProperty } from '@nestjs/swagger';

export class PeoplePresenter {
  @ApiProperty()
  name: string;
  @ApiProperty()
  gender: string;
  @ApiProperty()
  homeworld: string;
  @ApiProperty()
  birth_year: string;
}

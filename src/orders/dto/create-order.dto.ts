import { IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { IsString, IsNumber } from 'class-validator';

class ItemDto {
  @IsString()
  title: string;

  @IsNumber()
  price: number;
}

export class CreateOrderDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ItemDto)
  items: ItemDto[];
}

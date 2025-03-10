import {
  Body,
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
} from '@nestjs/common';
import { ShiftsService } from './shifts.service';
import { StartShiftDto } from './dto/start-shift.dto';
import { CloseShiftDto } from './dto/close-shift.dto';

@Controller('shifts')
export class ShiftsController {
  constructor(private readonly shiftsService: ShiftsService) {}

  @Get()
  getAll() {
    return this.shiftsService.getAll();
  }

  @Post('start')
  startShift(@Body() startShiftDto: StartShiftDto) {
    return this.shiftsService.startShift(startShiftDto);
  }

  @Post('close')
  closeShift(@Body() closeShiftDto: CloseShiftDto) {
    return this.shiftsService.closeShift(closeShiftDto);
  }

  @Get('active/:userId')
  getActiveShift(@Param('userId', ParseUUIDPipe) userId: string) {
    return this.shiftsService.getActiveShift(userId);
  }
}

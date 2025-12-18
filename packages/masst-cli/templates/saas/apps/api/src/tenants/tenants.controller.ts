import { Controller, Get, Patch, Body, UseGuards, Request } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { TenantsService } from './tenants.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { UpdateTenantDto } from './dto/update-tenant.dto';

@ApiTags('tenants')
@Controller('tenants')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class TenantsController {
  constructor(private tenantsService: TenantsService) {}

  @Get('current')
  @ApiOperation({ summary: 'Get current tenant' })
  async getCurrent(@Request() req: any) {
    return this.tenantsService.findById(req.user.tenantId);
  }

  @Patch('current')
  @ApiOperation({ summary: 'Update current tenant' })
  async updateCurrent(@Request() req: any, @Body() updateDto: UpdateTenantDto) {
    return this.tenantsService.update(req.user.tenantId, updateDto);
  }
}

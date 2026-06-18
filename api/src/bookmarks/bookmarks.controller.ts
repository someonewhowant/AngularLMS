import { Controller, Get, Post, Body, Param, Delete, ParseIntPipe, UseGuards, Request } from '@nestjs/common';
import { BookmarksService } from './bookmarks.service';
import { CreateBookmarkDto } from './dto/create-bookmark.dto';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@ApiTags('bookmarks')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
@Controller('bookmarks')
export class BookmarksController {
  constructor(private readonly bookmarksService: BookmarksService) {}

  @Post()
  @ApiOperation({ summary: 'Add a post to bookmarks' })
  create(@Request() req: any, @Body() createBookmarkDto: CreateBookmarkDto) {
    return this.bookmarksService.create(req.user.id, createBookmarkDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all my bookmarks' })
  findAll(@Request() req: any) {
    return this.bookmarksService.findAllByUser(req.user.id);
  }

  @Delete(':postId')
  @ApiOperation({ summary: 'Remove a post from bookmarks' })
  remove(@Request() req: any, @Param('postId', ParseIntPipe) postId: number) {
    return this.bookmarksService.remove(req.user.id, postId);
  }
}

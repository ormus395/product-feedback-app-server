import {
  Controller,
  Post,
  Body,
  Request,
  UseGuards,
  UseInterceptors,
  Get,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { SerializeInterceptor } from '../../interceptors/serialize.interceptor';
import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dto/comment-creation.dto';
import { CommentDto } from './dto/comment.dto';

@UseInterceptors(new SerializeInterceptor(CommentDto))
@Controller('comments')
export class CommentsController {
  constructor(private commentService: CommentsService) {}

  @Get('/:suggestionId')
  getCommentsBySuggestion(
    @Param('suggestionId', ParseIntPipe) suggstionId: number,
  ) {
    return this.commentService.getCommentsBySuggestion(suggstionId);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post()
  createComment(@Request() req, @Body() body: CreateCommentDto) {
    return this.commentService.create(body, req.user);
  }
}

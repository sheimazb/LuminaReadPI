<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class MailVerification extends Mailable
{
    
        use Queueable, SerializesModels;
    
        public array $content;
    
        public function __construct(array $content) {
            $this->content = $content;
        }
    
        public function build()
        {
            return $this->subject($this->content['subject'])
                ->view('email.email');
        }
}
